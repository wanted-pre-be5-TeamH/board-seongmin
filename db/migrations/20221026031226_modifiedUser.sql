-- migrate:up
ALTER TABLE `user` ADD email varchar(36) NOT NULL;
ALTER TABLE `user` DROP COLUMN connection_date;
ALTER TABLE `user` MODIFY COLUMN phone VARCHAR(100) NOT NULL;

-- migrate:down

