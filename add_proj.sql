-- Step 1: Insert the new project into the projects table
INSERT INTO projects (title, content) VALUES ('Example Project A', 'Whatever content you want to put here.');

-- Store the ID of the newly inserted project for later use
SET @last_project_id = LAST_INSERT_ID();

-- Step 2: Check if the language(s) used for the project already exist in the languages table. If not, insert them.
-- For demonstration purposes, let's say the new project uses 'Python' and 'JavaScript'

-- Check and insert 'Python' if it doesn't exist
INSERT INTO languages (name) 
SELECT 'Python' 
WHERE NOT EXISTS (SELECT 1 FROM languages WHERE name = 'Python');

-- Store the ID of 'Python' for later use
SET @python_id = (SELECT id FROM languages WHERE name = 'Python');

-- Check and insert 'JavaScript' if it doesn't exist
INSERT INTO languages (name) 
SELECT 'JavaScript' 
WHERE NOT EXISTS (SELECT 1 FROM languages WHERE name = 'JavaScript');

-- Store the ID of 'JavaScript' for later use
SET @javascript_id = (SELECT id FROM languages WHERE name = 'JavaScript');

-- Step 3: Insert the relations between the project and its languages into the project_language_relation table

-- Insert relation for 'Python'
INSERT INTO project_langauge_relation (project_id, language_id) 
VALUES (@last_project_id, @python_id);

-- Insert relation for 'JavaScript'
INSERT INTO project_langauge_relation (project_id, language_id) 
VALUES (@last_project_id, @javascript_id);
