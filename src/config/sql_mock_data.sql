USE twitter_db;

-- Users
INSERT INTO users (user_id, user_handle, email_address, first_name, last_name, phone_number, follower_count) VALUES
(1, 'alice',   'alice@example.com',   'Alice',   'Johnson', '555-0101', 2),
(2, 'bob',     'bob@example.com',     'Bob',     'Smith',   '555-0102', 3),
(3, 'charlie', 'charlie@example.com', 'Charlie', 'Brown',   '555-0103', 0),
(4, 'diana',   'diana@example.com',   'Diana',   'Prince',  '555-0104', 0),
(5, 'eve',     'eve@example.com',     'Eve',     'Davis',   '555-0105', 0);

-- Tweets (3 per user)
INSERT INTO tweets (tweet_id, user_id, tweet_text, likes_count) VALUES
-- Alice
(1, 1, 'Just set up my new dev environment!', 4),
(2, 1, 'TypeScript makes life so much better.', 0),
(3, 1, 'Anyone else love Express middleware?', 0),
-- Bob
(4, 2, 'MySQL is actually pretty fast with the right indexes.', 2),
(5, 2, 'Working on a new side project this weekend.', 0),
(6, 2, 'Coffee and code. Name a better duo.', 1),
-- Charlie
(7, 3, 'First day learning Rust. Wish me luck!', 1),
(8, 3, 'Open source contributions are addicting.', 0),
(9, 3, 'Just deployed my first Docker container.', 0),
-- Diana
(10, 4, 'GraphQL vs REST — why not both?', 0),
(11, 4, 'Designing APIs is my favorite part of backend work.', 1),
(12, 4, 'Anyone going to the tech meetup next week?', 0),
-- Eve
(13, 5, 'Just finished a 10-mile run. Time to code!', 0),
(14, 5, 'Pair programming > solo coding.', 0),
(15, 5, 'Learning Go this month. So far so good!', 0);

-- Likes (each user likes 2 tweets)
INSERT INTO tweet_likes (user_id, tweet_id) VALUES
-- Alice likes Bob's tweets
(1, 4), (1, 6),
-- Bob likes Alice & Charlie
(2, 1), (2, 7),
-- Charlie likes Alice & Bob
(3, 1), (3, 4),
-- Diana likes Alice & Bob
(4, 1), (4, 5),
-- Eve likes Alice & Diana
(5, 1), (5, 11);

-- Followers
-- Alice has 2 followers: Bob and Charlie
INSERT INTO followers (follower_id, following_id) VALUES (2, 1), (3, 1);
-- Bob has 3 followers: Charlie, Diana, Eve
INSERT INTO followers (follower_id, following_id) VALUES (3, 2), (4, 2), (5, 2);
