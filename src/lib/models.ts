import mongoose, { Schema } from 'mongoose';

const ContactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const NewsletterSchema = new Schema({
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now },
});

const UniversitySchema = new Schema({
  // Basic Info
  name: { type: String, required: true },
  image: { type: String }, // Main display image
  country: { type: String, required: true },
  city: { type: String, required: true },
  type: { type: String, enum: ['Public', 'Private', 'Community College', 'Language School'], required: true },

  // Details
  description: { type: String, required: true },
  establishedYear: { type: String },
  campusLocation: { type: String },
  website: { type: String },
  ranking: { type: String },

  // Academic
  availableCourses: { type: String, required: true },
  degreeLevels: [{ type: String, enum: ['Diploma', "Bachelor's", "Master's", 'PhD'] }],
  studyFields: [{ type: String, enum: ['Engineering', 'Business', 'IT', 'Medicine', 'Arts', 'Science', 'Others'] }],

  // Admission
  intakeMonths: { type: String },
  applicationDeadline: { type: String },
  minAcademicRequirement: { type: String },
  englishRequirement: { type: String },

  // Financial
  tuitionFee: { type: String },
  applicationFee: { type: String },
  scholarshipAvailable: { type: Boolean, default: false },
  scholarshipDetails: { type: String },

  // Student Info
  internationalStudentsAccepted: { type: Boolean, default: false },
  accommodationAvailable: { type: Boolean, default: false },
  accommodationDetails: { type: String },

  // Media
  universityImages: [{ type: String }],
  campusVideoUrl: { type: String },

  // Contact
  emailAddress: { type: String },
  phoneNumber: { type: String },
  address: { type: String },

  // Status
  featuredUniversity: { type: Boolean, default: false },
  activeStatus: { type: Boolean, default: true },

  createdAt: { type: Date, default: Date.now },
});

const CourseSchema = new Schema({
  title: { type: String, required: true },
  university: { type: String, required: true },
  country: { type: String, required: true },
  level: { type: String, enum: ["Bachelor's", "Master's", "PhD", 'MBA', 'Certificate'], required: true },
  duration: { type: String },
  tuitionFee: { type: String },
  intake: { type: String },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const PartnerSchema = new Schema({
  organizationName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  country: { type: String, required: true },
  interest: { type: String, required: true },
  message: { type: String },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

export const Contact    = mongoose.models.Contact    || mongoose.model('Contact',    ContactSchema);
export const Newsletter = mongoose.models.Newsletter || mongoose.model('Newsletter', NewsletterSchema);
export const University = mongoose.models.University || mongoose.model('University', UniversitySchema);
export const Course     = mongoose.models.Course     || mongoose.model('Course',     CourseSchema);
export const Partner    = mongoose.models.Partner    || mongoose.model('Partner',    PartnerSchema);
