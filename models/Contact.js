import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose); // Pass mongoose instance

const contactSchema = mongoose.Schema(
  {
    _id: {
      type: Number, // Use Number type for auto-incremented ID
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically sets the timestamp when the document is created
    },
    updatedAt: {
      type: Date,
      default: Date.now, // Automatically sets the timestamp when the document is updated
    },
  },
  {
    timestamps: false, // Disable default timestamps (createdAt & updatedAt)
    _id: false, // Disable default ObjectId creation
  }
);

// Apply auto-increment plugin to contactSchema
contactSchema.plugin(AutoIncrement, { id: 'contact_id_seq', inc_field: '_id' });

// Automatically update the updatedAt field before saving the document
contactSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
