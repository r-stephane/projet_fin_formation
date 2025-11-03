// controllers/userController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

// Import des modèles et utilitaires
const userModel = require("../models/userModel");
const generateOTP = require("../email/generateOTP");
const otpModel = require("../models/otpModel");
const transporter = require("../email/mailTransporter");
const { userSchema } = require("../models/validation"); // Assure-toi que validation.js exporte { userSchema }

// ─────────────────────────────────────────────────────────────
// ENREGISTREMENT D’UN UTILISATEUR
// ─────────────────────────────────────────────────────────────
const register = async (req, res) => {
  try {
    const { nom, prenom, email, password, confirm_password } = req.body;

    // Validation des champs avec Joi
    const { error } = userSchema.validate({ email, password });
    if (error) return res.status(400).json({ message: error.message });

    // Vérifie si l'email existe déjà
    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.status(422).json({ message: "L'email existe déjà" });

    // Vérifie la correspondance des mots de passe
    if (password !== confirm_password) {
      return res.status(400).json({ message: "Les mots de passe ne correspondent pas" });
    }

    // Hashage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const newUser = await userModel.create({
      nom,
      prenom,
      email,
      password: hashedPassword,
      isActive: true,
      isEmailVerified: false,
    });

    // Génération OTP et token
    const otp = generateOTP();
    const otpToken = uuidv4();

    await otpModel.create({
      userId: newUser._id,
      otp,
      otpToken,
      purpose: "verify-email",
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // expire après 10 minutes
    });

    // Envoi de l’email de vérification
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: newUser.email,
        subject: "Vérification de votre adresse email",
        html: `
          <h2>Bienvenue ${prenom || ""} !</h2>
          <p>Utilisez le code ci-dessous pour vérifier votre adresse email :</p>
          <h3>${otp}</h3>
          <p>Ce code expirera dans 10 minutes.</p>
        `,
      });
    } catch (emailErr) {
      console.error("Erreur d'envoi de l'email :", emailErr);
      return res.status(500).json({
        message: "Utilisateur créé mais échec de l'envoi de l'email de vérification",
        error: emailErr.message,
      });
    }

    return res.status(201).json({
      message: "Inscription réussie ! Vérifiez votre email pour le code OTP.",
      otpToken,
      userId: newUser._id,
    });
  } catch (err) {
    console.error("Erreur lors de l'inscription :", err);
    return res.status(500).json({
      message: "Erreur serveur lors de l'inscription",
      error: err.message,
    });
  }
};

// ─────────────────────────────────────────────────────────────
// VÉRIFICATION EMAIL PAR OTP
// ─────────────────────────────────────────────────────────────
const verify = async (req, res) => {
  try {
    const { otp, otpToken, purpose } = req.body;

    if (purpose !== "verify-email")
      return res.status(422).json({ message: "Purpose invalide" });

    const otpDetails = await otpModel.findOne({ otpToken, purpose });
    if (!otpDetails) return res.status(404).json({ message: "OTP introuvable" });

    if (otp !== otpDetails.otp)
      return res.status(406).json({ message: "OTP invalide" });

    const verifiedUser = await userModel.findByIdAndUpdate(
      otpDetails.userId,
      { isEmailVerified: true },
      { new: true }
    );

    await otpModel.findByIdAndDelete(otpDetails._id); // Supprime le code après vérification

    return res.json({
      message: "Utilisateur vérifié avec succès",
      verifiedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// ─────────────────────────────────────────────────────────────
// CONNEXION UTILISATEUR
// ─────────────────────────────────────────────────────────────
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = userSchema.validate({ email, password });
    if (error) return res.status(400).json({ message: error.message });

    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

    if (!user.isActive)
      return res.status(403).json({ message: "Compte désactivé. Contactez l'administrateur." });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Connexion réussie",
      user: {
        id: user._id,
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        isEmailVerified: user.isEmailVerified,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// ─────────────────────────────────────────────────────────────
// DÉCONNEXION
// ─────────────────────────────────────────────────────────────
const logout = async (req, res) => {
  try {
    req.logout?.();
    res.json({ message: "Déconnexion réussie" });
  } catch {
    res.json({ message: "Session terminée" });
  }
};

// ─────────────────────────────────────────────────────────────
// RÉINITIALISATION MOT DE PASSE (ENVOI OTP)
// ─────────────────────────────────────────────────────────────
const reinitialize = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });

    // Sécurité : ne pas révéler si l'utilisateur existe
    if (!user) {
      return res.status(200).json({
        message: "Si l'email existe, un code de réinitialisation a été envoyé.",
      });
    }

    const otp = generateOTP();
    const otpToken = uuidv4();

    await otpModel.create({
      userId: user._id,
      otp,
      otpToken,
      purpose: "reset-password",
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Réinitialisation du mot de passe",
      html: `
        <h2>Réinitialisation du mot de passe</h2>
        <p>Votre code de vérification est : <strong>${otp}</strong></p>
        <p>Ce code expirera dans 15 minutes.</p>
      `,
    });

    res.status(200).json({
      message: "Si l'email existe, un code de réinitialisation a été envoyé.",
      otpToken,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// ─────────────────────────────────────────────────────────────
// MISE À JOUR MOT DE PASSE AVEC OTP
// ─────────────────────────────────────────────────────────────
const resetPassword = async (req, res) => {
  try {
    const { otp, otpToken, newPassword } = req.body;

    const { error } = userSchema.validate({
      email: "temp@email.com",
      password: newPassword,
    });
    if (error) return res.status(400).json({ message: error.message });

    const otpRecord = await otpModel.findOne({
      otpToken,
      otp,
      purpose: "reset-password",
      expiresAt: { $gt: new Date() },
    });

    if (!otpRecord)
      return res.status(400).json({ message: "Code invalide ou expiré." });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await userModel.findByIdAndUpdate(otpRecord.userId, {
      password: hashedPassword,
    });

    await otpModel.findByIdAndDelete(otpRecord._id);

    res.status(200).json({
      message: "Mot de passe réinitialisé avec succès.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// ─────────────────────────────────────────────────────────────
// LISTE TOUS LES UTILISATEURS
// ─────────────────────────────────────────────────────────────
const getAll = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// ─────────────────────────────────────────────────────────────
// MISE À JOUR D’UN UTILISATEUR
// ─────────────────────────────────────────────────────────────
const updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      return res.status(400).json({
        message: "Utilisez la route de réinitialisation pour modifier le mot de passe",
      });
    }

    const updatedUser = await userModel
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json({
      message: "Utilisateur mis à jour avec succès",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour",
      error: error.message,
    });
  }
};

// ─────────────────────────────────────────────────────────────
module.exports = {
  register,
  login,
  verify,
  resetPassword,
  reinitialize,
  logout,
  getAll,
  updateUser,
};
