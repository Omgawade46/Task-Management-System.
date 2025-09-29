
-- Create Database
CREATE DATABASE task;
GO

USE task;
GO

-- Users Table
CREATE TABLE Users (
    UserId INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);



-- Tasks Table
CREATE TABLE Tasks (
    TaskId INT IDENTITY(1,1) PRIMARY KEY,
    UserId INT NOT NULL,
    Title NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX),
    DueDate DATE NOT NULL,
    Priority NVARCHAR(20) CHECK (Priority IN ('Low', 'Medium', 'High')),
    Status NVARCHAR(20) CHECK (Status IN ('Pending', 'In Progress', 'Completed')),
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE
);


-- Sample Users
INSERT INTO Users (Name, Email, PasswordHash)
VALUES 
('Alice', 'alice@example.com', 'hashed_password_1'),
('Bob', 'bob@example.com', 'hashed_password_2');


-- Sample Tasks
INSERT INTO Tasks (UserId, Title, Description, DueDate, Priority, Status)
VALUES
(1, 'Finish Angular Assignment', 'Complete UI for task manager', '2025-10-01', 'High', 'Pending'),
(1, 'Prepare Presentation', 'Work on slides for demo', '2025-10-05', 'Medium', 'In Progress'),
(2, 'Fix Backend Bugs', 'Resolve API issues', '2025-10-02', 'High', 'Completed');

