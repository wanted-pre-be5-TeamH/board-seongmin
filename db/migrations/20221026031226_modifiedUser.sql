-- migrate:up
ALTER TABLE preonboardproject1.`user` ADD email varchar(36) NOT NULL;
ALTER TABLE preonboardproject1.`user` DROP COLUMN connection_date;
ALTER TABLE preonboardproject1.`user` MODIFY COLUMN phone VARCHAR(100) NOT NULL;

-- migrate:down

