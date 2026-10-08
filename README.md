# learning-git

A tiny TODO list app used for hands-on Git and GitHub training.

The app is intentionally simple — plain HTML, CSS and JavaScript with no
build step and no dependencies — so you can focus on Git, and see the effect
of every change immediately in the browser.

## Features

- Add a task
- Mark a task as done / not done
- Delete a task
- Clear all completed tasks
- Counter showing how many tasks are left
- Tasks are saved in your browser (localStorage), so they survive a refresh

## How to run

1. Clone or download this repository.
2. Open `index.html` in any modern browser.

That's it — no installation needed.

> Tip: In VS Code you can also use the **Live Server** extension to reload the
> page automatically every time you save a file.

## Project structure

```
learning-git/
├── index.html   # Page layout
├── style.css    # Styles
├── app.js       # App logic
└── README.md    # This file
```

## Training exercises

The exercises below will be added to this repository as the training
progresses. Each one will start from its own branch, so `main` stays clean.

| Topic | What you will practice |
|---|---|
| Commit and push | Make a small text change, commit it, and push it to GitHub |
| Branch and pull request | Add a new feature on a branch and open a pull request |
| Merge conflict | Resolve a conflict where two branches changed the same line |
| Stash | Save unfinished work before switching to another branch |
| Finding a bug in history | Use the commit history to find where a feature broke |

## License

Free to use for learning purposes.
