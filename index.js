const express = require('express');
const app = express();
const port = 3000; 

app.get('/info', (req, res) => {
  try {
    const slackName = req.query.slack_name;
    const track = req.query.track;

    if (!slackName || !track) {
      return res.status(400).json({ error: "Slack name and track parameters are required" });
    }

  
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayIndex = new Date().getUTCDay();
    const currentDay = daysOfWeek[currentDayIndex];


    const currentUTC = new Date();
    const utcOffset = currentUTC.getTimezoneOffset();
    const utcTime = new Date(currentUTC.getTime() - (utcOffset + 2 * 60 * 60 * 1000));
    const utcTimeStr = utcTime.toISOString();


    const githubRepoUrl = 'https://github.com/topeetee';
    const githubFileUrl = `${githubRepoUrl}/blob/main/HNG1TASK`;

    const response = {
      slack_name: slackName,
      current_day: currentDay,
      utc_time: utcTimeStr,
      track: track,
      github_file_url: githubFileUrl,
      github_repo_url: githubRepoUrl,
      status_code: 200
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
