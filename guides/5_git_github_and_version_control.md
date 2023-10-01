# (GUIDE) Git, GitHub, and Version Control
This guide teaches by example (with the HACS frontend repo: [texas-HACS/hacs-frontend](https://github.com/texas-HACS/hacs-frontend)), but these commands can be applied to virtually any use case.

# Table of Contents
[Local: Working on your machine](#local)

&nbsp;&nbsp;&nbsp;&nbsp;[Repository: Version control & tracking changes](#what-is-a-repository)

&nbsp;&nbsp;&nbsp;&nbsp;[Cloning: Getting all files](#cloning-a-repository)

&nbsp;&nbsp;&nbsp;&nbsp;[Comitting: Creating sets of changes](#commits)

&nbsp;&nbsp;&nbsp;&nbsp;[Branching: Creating/organizing new features](#ranches)

&nbsp;&nbsp;&nbsp;&nbsp;[Merging: combining changes](#merge)

&nbsp;&nbsp;&nbsp;&nbsp;[Pushing: updating the remote](#push)

[Remote](#remote-github)


---

# Local

## What Is a Repository?
Also called a "repo", a repository is a location in which software packages are stored. They are often managed with some software that stores metadata surrounding their content, changes, updates, etc.

Oftentimes, these repositories are created and managed on version control/hosting sites like [GitHub](https://github.com).

## Cloning a Repository
```bash
git clone https://github.com/texas-HACS/hacs-frontend.git
```
When you create a repository on GitHub (or any other remote service), it exists as a remote repository. You can **clone** your repository to create a local copy on your computer and sync between the two locations.

Running the listed command will copy the current state of the hacs-frontend repository into a new directory (folder) named hacs-frontend at the current location on your local machine.

## Commits
```bash
git commit -m "Description of the changes in this commit..."
```
A commit can be seen as a revision to a set of files. Git will create a unique ID to record the changes made in the current commit.

Each commit usually contains a message in which the changes are described.

### Staging a commit
Files can be added to be "staged" for a commit. This creates a distinction between the current changes and the changes that are to be committed next. Files are staged by "adding" them.

### Adding files to a commit
Since a commit tracks revisions to a set of files, these changes need to be added prior to committing. There are a few ways to do so.
```bash
git add -A
```
This will add all current changes to be "staged" for a commit.
```bash
git add <path to file>
```
This will add the specified file (file.js, located in path/to/) to be "staged" for the next commit.

From this point, the staged files will be included in the next commit.

## Status
```bash
git status
```
This is a great command to let you see the current state of the working directory and staged files. From here, you can see the current branch, staged changes, other changes, current state compared to the remote repository, etc.

## Branches
A branch is a version of the repository that diverges from the main working project. Usually this main working project is denoted as the "master" or "main" branch.

All other branches hold the state of the main branch (from the point at which they diverged), plus the changes found in the commits on that branch.

### Create a branch
```bash
git branch <branch-name>
```
This creates a new local branch, which will hold the current state of its parent branch. See how to [switch to a branch](#switch-to-a-branch) after creating it.

A condensed way of creating and switching to a new branch is the following:
```bash
git checkout -b <branch-name>
```

### Switch to a branch
```bash
git checkout <branch-name>
```
This "checks out" or switches to the target branch for you to make changes on the branch.

### Delete a branch
```bash
 git branch -d <branch name>  
```
This deletes the target branch from the local repository. If the branch has unmerged changes (any commits since it diverged), extra precautions must be taken.

### List all local branches
```bash
git branch
```
This shows you all branches in the local repository, with the currently active branch being denoted by a *.

### Merging a branch
```bash
git merge <branch name>
```
Please read about [merging](#merge) prior to working with this command.
This "merges" all changes of the target branch into the current branch.

## Merge
```bash
git merge <branch name>
```
Merging is the process of combining multiple sequences of changes into a single unified history. Most often, this is done by combining two branches.

The merge is done by finding a common base commit between two branches. Then, a "merge commit" will be created with the changes since this base commit.

Oftentimes, two branches will have common data that has been changed, causing a "[merge conflict](#merge-conflict)." Dealing with this scenario requires manual intervention.

## Merge Conflict
In the case of a merge conflict, manual intervention is required to stabilize the conflict before committing, which will resolve and finalize the merge.

A merge conflict will cause git to visually edit the affected files and present the conflicts in the following format:
```
1. line 1 is unaffected by the conflict
2. <<<<<<< main
   This is line 2 of the main branch
   =======
   This is line 2 of feature branch, which is different
   >>>>>>> feature branch
3. line 3 is also unaffected by the conflict
```
Notice how line 2 differs between the two branches. It is up to the user handling this merge conflict to accept one or both of these changes. Here are examples:
```
1. line 1 is unaffected by the conflict
2. This is line 2 of feature branch, which is different
3. line 3 is also unaffected by the conflict
```
This is an example of the file after accepting the changes found in the feature branch.
```
1. line 1 is unaffected by the conflict
2. This is line 2 of the main branch
3. This is line 2 of feature branch, which is different
4. line 3 is also unaffected by the conflict
```
This is an example of the file after accepting both sets of changes.

### Finalizing a merge conflict
Git will hold a status indicating that you are currently resolving a merge conflict until a commit is made to resolve all conflicts. In order to resolve it, add all changed files from your conflict resolution and commit them.
```bash
git add <resolved file>
git commit -m "Resolved merge conflict by accepting both changes"
```

### Important considerations when merging
It is important to remember that merged changes may affect existing code. Attempt to separate workflows and features so that merge conflicts can be avoided.

In the case that this cannot be done, it is important to effectively communicate everything that is changed in the merge conflict resolution.

Prior to committing and resolving, test all changes and reach out to previous owners of the code (if at all possible) to clarify the changes.

## Push
```bash
git push
```
This updates the remote repository with your local state, and is essential in aligning work with other contributors.

All commits, branches, etc. with upstream (remote) references will be updated in the remote repository with the same state as your local machine.

# Remote (GitHub)
Our remote repository is hosted at [github.com/texas-HACS/hacs-frontend](https://github.com/texas-HACS/hacs-frontend). This holds all information around the files, changes, issues, etc.




