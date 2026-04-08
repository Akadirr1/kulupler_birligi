const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema(
  {
    clubName: {
      type: String,
      required: [true, 'Kulüp adı zorunludur.'],
      trim: true,
    },
    university: {
      type: String,
      required: [true, 'Üniversite adı zorunludur.'],
      trim: true,
    },
    foundationYear: {
      type: Number,
      required: [true, 'Kuruluş yılı zorunludur.'],
      min: [1950, 'Geçerli bir kuruluş yılı giriniz.'],
      max: [new Date().getFullYear(), 'Geçerli bir kuruluş yılı giriniz.'],
    },
    captainName: {
      type: String,
      required: [true, 'Kaptan adı zorunludur.'],
      trim: true,
    },
    captainEmail: {
      type: String,
      required: [true, 'Kaptan e-posta adresi zorunludur.'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Geçerli bir e-posta adresi giriniz.'],
    },
    captainPhone: {
      type: String,
      required: [true, 'Kaptan telefon numarası zorunludur.'],
      trim: true,
    },
    teknofestCategories: {
      type: [String],
      required: [true, 'En az bir Teknofest kategorisi seçiniz.'],
      validate: {
        validator: (arr) => arr.length > 0,
        message: 'En az bir Teknofest kategorisi seçiniz.',
      },
    },
    motivationMessage: {
      type: String,
      required: [true, 'Motivasyon mesajı zorunludur.'],
      minlength: [50, 'Motivasyon mesajı en az 50 karakter olmalıdır.'],
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Application', ApplicationSchema);
