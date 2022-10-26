-- migrate:up
CREATE TABLE `user` (
	`user_id`	varchar(36)	NOT NULL,
	`user_name`	varchar(100)	NOT NULL,
	`grade`	varchar(36)	NOT NULL,
	`gender` enum('M','F')	NOT NULL,
	`age`	int	NOT NULL,
	`phone`	int	NOT NULL,
	`created`	dateTime	NOT NULL	DEFAULT current_timeStamp(),
	`connection_date`	dateTime	NULL	DEFAULT current_timeStamp(),
	`password`	varchar(100)	NOT NULL
);

CREATE TABLE `board` (
	`board_id`	varchar(36)	NOT NULL,
	`user_id`	varchar(36)	NOT NULL,
	`title`	varchar(2048)	NOT NULL,
	`text`	text	NOT NULL,
	`created`	dateTime	NOT NULL	DEFAULT current_timeStamp(),
	`updated`	dateTime	NULL	DEFAULT current_timeStamp(),
	`access_grade`	varchar(36)	NOT NULL	DEFAULT 'all'
);

ALTER TABLE `user` ADD CONSTRAINT `PK_USER` PRIMARY KEY (
	`user_id`
);

ALTER TABLE `board` ADD CONSTRAINT `PK_BOARD` PRIMARY KEY (
	`board_id`,
	`user_id`
);

ALTER TABLE `board` ADD CONSTRAINT `FK_User_TO_board_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `user` (
	`user_id`
);

-- migrate:down

