-- migrate:up
ALTER TABLE `board` ADD `type` TINYINT NOT NULL;


-- migrate:down

