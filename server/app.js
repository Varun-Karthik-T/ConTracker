const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dbConnection = require('./config/dbConfig');
const cors = require('cors');
const Issue = require('./models/Issue');
const UserIssue = require('./models/UserIssue'); // Import the UserIssue model
const Counter = require('./models/Counter'); // Import the Counter model

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());

app.post('/issues', async (req, res) => {
  try {
    const issue = req.body;
    console.log('POST /issues', issue);

    // Get the next sequence value for the id
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'issueId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    // Set the id field to the next sequence value
    issue.id = counter.seq;

    // Insert the new issue
    const newIssue = new Issue(issue);
    await newIssue.save();

    return res.status(201).json({ message: 'Issue created successfully', issue: newIssue });
  } catch (error) {
    console.error('Error creating issue:', error);
    res.status(500).json({ error: error.message });
  }
});


app.get('/issues', async (req, res) => {
  try {
    console.log('GET /issues');

    // Fetch all issues
    const issues = await Issue.find();
    console.log(issues);
    return res.status(200).json(issues);
  } catch (error) {
    console.error('Error fetching issues:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/vote', async (req, res) => {
  try {
    const { issueId, userId, voteType } = req.body;
    console.log('POST /vote', { issueId, userId, voteType });

    // Find the issue by its id field
    const issue = await Issue.findOne({ id: issueId });
    if (!issue) {
      return res.status(404).json({ error: 'Issue not found' });
    }
    console.log(issue.approval);

    // Update the approval or denial count
    const update = {};
    if (voteType === 'approve') {
      update.approval = issue.approval + 1;
    } else if (voteType === 'deny') {
      update.denial = issue.denial + 1;
    } else {
      return res.status(400).json({ error: 'Invalid vote type' });
    }

    // Update the issue
    await Issue.updateOne({ id: issueId }, update);
    console.log('Updated issue:', update);

    // Create a new UserIssue mapping
    const temp = Issue.find()
 
    await UserIssue.collection.insertOne({ userId, issueId, voted: voteType });

    return res.status(200).json({ message: 'Vote recorded successfully' });
  } catch (error) {
    console.error('Error submitting vote:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/vote-status', async (req, res) => {
  try {
    const { userId, issueId } = req.query;
    console.log('GET /vote-status', { userId, issueId });

    // Find the user-issue mapping
    const userIssue = await UserIssue.findOne({ userId, issueId });
    console.log(userIssue.voted);
    if (!userIssue.voted) {
      return res.status(200).json({ voted: null });
    }

    return res.status(200).json({ voted: userIssue.voted });
  } catch (error) {
    console.error('Error fetching vote status:', error);
    res.status(500).json({ error: error.message });
  }
});

app.use('/*', (req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});