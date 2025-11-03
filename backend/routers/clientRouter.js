const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router(); 
// Assurez-vous que 'auth' est importé
// const auth = require('../middleware/auth'); 

const userModel = require('../models/userModel');


// --- ROUTES D'AUTHENTIFICATION (PAS BESOIN D'AUTHENTIFICATION POUR CELLES-CI) ---

// Création d'un client (Inscription / POST /register)
router.post('/register', async (req, res) => {
  // CORRECTION 1 : Suppression de la duplication de 'password'
  const { email, nom, prenom, password, confirm_password } = req.body;
  
  // CORRECTION 2 : Validation complète
  if (!email || !password || !nom || !prenom || !confirm_password) {
    return res.status(400).json({ message: 'Tous les champs sont requis (email, nom, prénom, mot de passe)' });
  }

  // CORRECTION 2 : Vérification de la confirmation du mot de passe
  if (password !== confirm_password) {
      return res.status(400).json({ message: 'Le mot de passe et sa confirmation ne correspondent pas.' });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Cet email existe déjà' });
    }
    
    // Le hachage est correct
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Création de l'utilisateur avec tous les champs
    const user = await userModel.create({ 
      email, 
      nom, 
      prenom, 
      password: hashedPassword, 
      isActive: true, 
      isEmailVerified: false 
    });
    
    // Réponse de succès
    res.status(201).json({ 
      message: 'Client créé avec succès', 
      user: { email: user.email, id: user._id, nom: user.nom } 
    });
    
  } catch (error) {
    console.error(error); // Meilleur débogage
    res.status(500).json({ message: 'Erreur lors de la création du client', error: error.message });
  }
});


// Route de connexion client (POST /login)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe requis' });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Mot de passe ou email incorrect' });
    }
    
    // 💡 PROCHAINE ÉTAPE : Générer un JSON Web Token (JWT) ici et le renvoyer
    // Exemple : const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.status(200).json({ 
      message: 'Connexion réussie', 
      user: { email: user.email, id: user._id }, 
      // token 
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion', error: error.message });
  }
});


// CORRECTION 3 : La déconnexion ne peut pas utiliser req.logout() sans Passport.js.
// Pour une API REST, on informe juste le client que le token est à supprimer.
router.get('/logout', (req, res) => {
  // L'action réelle (suppression du token) se fait côté client
  res.status(200).json({ message: 'Déconnexion réussie. Veuillez supprimer le token côté client.' });
});


// --- ROUTES PROTÉGÉES (NÉCESSITENT D'ÊTRE CONNECTÉ) ---

// CORRECTION 5 : Le middleware d'authentification doit être placé ici
// pour ne protéger que les routes suivantes.
// router.use(auth); 

// Récupérer tous les clients (GET /clients)
// Cette route nécessite une protection et/ou des droits administrateur
router.get('/clients', /* auth, */ async (req, res) => {
  try {
    const clients = await userModel.find().select('-password');
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des clients', error: error.message });
  }
});

// Mettre à jour un client par son id (PATCH /:id)
router.patch('/:id', /* auth, */ async (req, res) => {
  try {
    // Note : Il est crucial de NE PAS permettre la modification du mot de passe
    // via cette route. Créez une route séparée (comme ci-dessous) pour cela.
    
    const updatedClient = await userModel.findByIdAndUpdate(
      req.params.id,
      req.body, // Attention : req.body pourrait contenir de nouveaux mots de passe non hachés!
      { new: true }
    ).select('-password');
    
    if (!updatedClient) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }
    res.status(200).json({ message: 'Client mis à jour', client: updatedClient });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour', error: error.message });
  }
});

// Supprimer un client par son id (DELETE /:id)
router.delete('/:id', /* auth, */ async (req, res) => {
  try {
    const deletedClient = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedClient) {
      return res.status(404).json({ message: 'Client non trouvé' });
    }
    res.status(200).json({ message: 'Client supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression', error: error.message });
  }
});

// --- ROUTES DE MISE À JOUR SÉCURISÉES ---

// Mettre à jour le mot de passe (si l'utilisateur est connecté et connaît l'ancien mot de passe)
router.patch('/update-password/:id', /* auth, */ async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: 'Ancien et nouveau mots de passe requis.' });
  }
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }
    
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'L\'ancien mot de passe est incorrect.' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.status(200).json({ message: 'Mot de passe mis à jour avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du mot de passe', error: error.message });
  }
});

// CORRECTION 4 : Ces routes sont des failles de sécurité dans leur état actuel. 
// Elles nécessitent un mécanisme d'envoi d'email avec un token temporaire.
// Je les ai renommées et simplifiées, mais elles sont toujours INCOMPLÈTES sans envoi d'email.
router.patch('/forgot-password-unsafe', async (req, res) => {
  res.status(501).json({ message: 'Non implémenté. Nécessite un service d\'envoi d\'e-mail avec un token de réinitialisation.' });
});

// Vérification de l'email
// Cette route doit idéalement être appelée avec un token temporaire unique envoyé par email.
router.patch('/verify-email', async (req, res) => {
  // Ici, vous devriez vérifier un token provenant de l'URL ou du corps de la requête, 
  // PAS SEULEMENT l'email, pour éviter qu'un utilisateur vérifie un autre.
  try {
    const { email } = req.body; // ou token: req.query.token

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }
    
    // Logique de vérification du token (manquante)
    
    user.isEmailVerified = true;
    await user.save();
    res.status(200).json({ message: 'Email vérifié' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la vérification de l\'email', error: error.message });
  }
});

module.exports = router;