-- migrate:up
ALTER TABLE `board` MODIFY COLUMN `access_grade` TINYINT NOT NULL;
ALTER TABLE `user` MODIFY COLUMN `grade` TINYINT NOT NULL;

-- migrate:down

