import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const teamData = [
  { name: 'Trailblazers', description: 'Build healthy habits one step at a time.', points: 185 },
  { name: 'Pulse Squad', description: 'Make every workout count.', points: 160 },
];

const userData = [
  { username: 'alex.runner', email: 'alex.runner@example.com', displayName: 'Alex Rivera', teamName: 'Trailblazers' },
  { username: 'sam.moves', email: 'sam.moves@example.com', displayName: 'Sam Chen', teamName: 'Trailblazers' },
  { username: 'jordan.cycles', email: 'jordan.cycles@example.com', displayName: 'Jordan Patel', teamName: 'Pulse Squad' },
  { username: 'casey.lifts', email: 'casey.lifts@example.com', displayName: 'Casey Morgan', teamName: 'Pulse Squad' },
];

const activityData = [
  { username: 'alex.runner', activityType: 'running', durationMinutes: 32, distanceKm: 4.8, points: 48, completedAt: new Date('2026-09-21T16:00:00Z') },
  { username: 'sam.moves', activityType: 'walking', durationMinutes: 45, distanceKm: 3.2, points: 32, completedAt: new Date('2026-09-22T16:00:00Z') },
  { username: 'jordan.cycles', activityType: 'cycling', durationMinutes: 40, distanceKm: 12, points: 50, completedAt: new Date('2026-09-23T16:00:00Z') },
  { username: 'casey.lifts', activityType: 'strength-training', durationMinutes: 35, points: 40, completedAt: new Date('2026-09-24T16:00:00Z') },
];

const workoutData = [
  { title: 'Easy Start Run', description: 'A relaxed route to build running endurance.', activityType: 'running', durationMinutes: 25, intensity: 'low' },
  { title: 'Brisk Neighborhood Walk', description: 'A steady walk with a few faster intervals.', activityType: 'walking', durationMinutes: 30, intensity: 'moderate' },
  { title: 'Bike and Explore', description: 'A comfortable cycling session at a conversational pace.', activityType: 'cycling', durationMinutes: 35, intensity: 'moderate' },
  { title: 'Bodyweight Basics', description: 'A balanced circuit of squats, push-ups, and core work.', activityType: 'strength-training', durationMinutes: 20, intensity: 'moderate' },
];

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    const teams = await Promise.all(
      teamData.map(({ name, ...data }) =>
        Team.findOneAndUpdate({ name }, { $set: data, $setOnInsert: { name } }, { upsert: true, new: true }),
      ),
    );
    const teamsByName = new Map(teams.map((team) => [team.name, team]));

    const users = await Promise.all(
      userData.map(({ teamName, ...data }) =>
        User.findOneAndUpdate(
          { username: data.username },
          { $set: { ...data, team: teamsByName.get(teamName)?._id } },
          { upsert: true, new: true },
        ),
      ),
    );
    const usersByName = new Map(users.map((user) => [user.username, user]));

    await Promise.all(
      teams.map((team) => {
        const members = userData
          .filter((user) => user.teamName === team.name)
          .map((user) => usersByName.get(user.username)!._id);
        return Team.updateOne({ _id: team._id }, { $set: { members } });
      }),
    );

    await Promise.all(
      activityData.map(({ username, ...data }) =>
        Activity.findOneAndUpdate(
          { user: usersByName.get(username)!._id, activityType: data.activityType, completedAt: data.completedAt },
          { $set: { ...data, user: usersByName.get(username)!._id } },
          { upsert: true, new: true },
        ),
      ),
    );

    await Promise.all(
      users.map((user, index) =>
        LeaderboardEntry.findOneAndUpdate(
          { user: user._id },
          { $set: { points: [80, 65, 72, 58][index] } },
          { upsert: true, new: true },
        ),
      ),
    );

    await Promise.all(
      workoutData.map(({ title, ...data }) =>
        Workout.findOneAndUpdate({ title }, { $set: data, $setOnInsert: { title } }, { upsert: true, new: true }),
      ),
    );

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
