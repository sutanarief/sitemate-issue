let issues = [
  {
    id: 1,
    title: "Login Page Bug",
    description: "Users are unable to log in due to a broken authentication API."
  },
  {
    id: 2,
    title: "Profile Update Feature",
    description: "The profile update feature does not save changes made by users."
  },
  {
    id: 3,
    title: "Dashboard Performance Issue",
    description: "The dashboard takes too long to load when fetching user data."
  },
];

const getIssue = (req, res) => {
  res.json(issues);
}

const createIssue = (req, res) => {
  const highestId = issues.reduce((maxId, issue) => {
    return Math.max(maxId, issue.id);
  }, 0);
  
  const newIssue = { id: highestId + 1, ...req.body };
  issues.push(newIssue);
  console.log(newIssue, issues.length, issues)
  res.status(201).json(newIssue);
}

const editIssue = (req, res) => {

  const id = parseInt(req.params.id);
  console.log(req.params.id)
  const index = issues.findIndex(issue => issue.id === id);

  if (index !== -1) {
    issues[index] = { id, ...req.body };
    res.json(issues[index]);
  } else {
    res.status(404).json({ message: "Issue not found" });
  }
}

const deleteIssue = (req, res) => {

  const id = parseInt(req.params.id);
  const index = issues.findIndex(issue => issue.id === id);

  if (index !== -1) {
    issues.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Issue not found" });
  }
}

module.exports =  {
  getIssue,
	createIssue,
	editIssue,
	deleteIssue
}