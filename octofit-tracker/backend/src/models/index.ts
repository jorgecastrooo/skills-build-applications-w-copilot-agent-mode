import { model, Schema, Types } from 'mongoose'

const userSchema = new Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    displayName: { type: String, required: true, trim: true },
    team: { type: Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true },
)

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, trim: true, default: '' },
    members: [{ type: Types.ObjectId, ref: 'User' }],
    points: { type: Number, min: 0, default: 0 },
  },
  { timestamps: true },
)

const activitySchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    activityType: {
      type: String,
      required: true,
      enum: ['running', 'walking', 'cycling', 'strength-training', 'other'],
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    points: { type: Number, min: 0, default: 0 },
    completedAt: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true },
)

const leaderboardEntrySchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true, unique: true },
    points: { type: Number, min: 0, required: true, default: 0 },
  },
  { timestamps: true },
)

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    activityType: {
      type: String,
      required: true,
      enum: ['running', 'walking', 'cycling', 'strength-training', 'other'],
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    intensity: { type: String, required: true, enum: ['low', 'moderate', 'high'] },
  },
  { timestamps: true },
)

export const User = model('User', userSchema)
export const Team = model('Team', teamSchema)
export const Activity = model('Activity', activitySchema)
export const LeaderboardEntry = model('LeaderboardEntry', leaderboardEntrySchema)
export const Workout = model('Workout', workoutSchema)