-- migrate:up
ALTER TABLE `user` ADD `type` TINYINT DEFAULT 1 NOT NULL;

-- migrate:down

