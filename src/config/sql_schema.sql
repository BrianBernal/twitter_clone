CREATE DATABASE IF NOT EXISTS twitter_db;
USE twitter_db;

CREATE TABLE IF NOT EXISTS users (
  user_id       INT          NOT NULL AUTO_INCREMENT,
  user_handle   VARCHAR(50)  NOT NULL,
  email_address VARCHAR(255) NOT NULL,
  first_name    VARCHAR(100) NOT NULL,
  last_name     VARCHAR(100) NOT NULL,
  phone_number  VARCHAR(20)  NULL,
  follower_count INT         NOT NULL DEFAULT 0,
  created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id),
  UNIQUE KEY uq_user_handle (user_handle),
  UNIQUE KEY uq_email_address (email_address)
);

CREATE TABLE IF NOT EXISTS tweets (
  tweet_id    INT          NOT NULL AUTO_INCREMENT,
  user_id     INT          NOT NULL,
  tweet_text  VARCHAR(280) NOT NULL,
  likes_count INT          NOT NULL DEFAULT 0,
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (tweet_id),
  KEY idx_user_id (user_id),
  CONSTRAINT fk_tweets_user FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS followers (
  follower_id  INT NOT NULL,
  following_id INT NOT NULL,
  PRIMARY KEY (follower_id, following_id),
  KEY idx_following_id (following_id),
  CONSTRAINT fk_followers_follower  FOREIGN KEY (follower_id)  REFERENCES users (user_id) ON DELETE CASCADE,
  CONSTRAINT fk_followers_following FOREIGN KEY (following_id) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tweet_likes (
  user_id  INT NOT NULL,
  tweet_id INT NOT NULL,
  PRIMARY KEY (user_id, tweet_id),
  KEY idx_tweet_id (tweet_id),
  CONSTRAINT fk_likes_user  FOREIGN KEY (user_id)  REFERENCES users  (user_id)  ON DELETE CASCADE,
  CONSTRAINT fk_likes_tweet FOREIGN KEY (tweet_id) REFERENCES tweets (tweet_id) ON DELETE CASCADE
);
