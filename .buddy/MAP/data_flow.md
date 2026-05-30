🏠 [Home](../README_FOR_HUMANS.md) · [Getting Started](../GETTING_STARTED.md) · [Architecture](../ARCHITECTURE.md) · [Tech](../TECH_STACK.md) · [Integrations](../INTEGRATIONS.md) · [Repo Map](../MAP/repo_map.md) · [Links](../LINKS.md)

---

# Data Flow

> The simple version: "X happens → it goes here → then here → then here."

## Common flows

### Sign up

```
Client → POST /api/auth/signup
  → validationMiddleware (checks handle, email, name)
  → authController.signup
    → userModel.findUserByEmail (checks duplicate email)
    → userModel.findUserByHandle (checks duplicate handle)
    → userModel.createUser (INSERT INTO users)
    → createSession (stores token in Map)
  ← Response: { data: { session_token, user } } (201)
```

### Sign in

```
Client → POST /api/auth/signin
  → validationMiddleware (checks email is present)
  → authController.signin
    → userModel.findUserByEmail (look up user)
    → createSession (stores token in Map)
  ← Response: { data: { session_token, user } }
```

### Create tweet (requires auth)

```
Client → POST /api/tweets (Authorization: Bearer <token>)
  → authMiddleware (validates token, sets req.userId)
  → validationMiddleware (checks tweet_text ≤ 280 chars)
  → tweetController.create
    → tweetModel.createTweet (INSERT INTO tweets)
  ← Response: { data: { tweet_id, tweet_text, ... } } (201)
```

### Get feed (requires auth)

```
Client → GET /api/feed?limit=20&offset=0 (Authorization: Bearer <token>)
  → authMiddleware (validates token)
  → feed controller
    → tweetModel.getFeedForUser (SELECT tweets from followed users)
  ← Response: { data: [tweet, ...] }
```

### Follow a user (requires auth)

```
Client → POST /api/followers (Authorization: Bearer <token>, body: { following_id })
  → authMiddleware
  → validationMiddleware (checks following_id is valid)
  → followController.follow
    → userModel.findUserById (check target exists)
    → followModel.isFollowing (check not already following)
    → followModel.followUser (INSERT INTO followers)
    → userModel.updateFollowerCount (increment on target)
  ← Response: { data: { message: "Now following user" } } (201)
```

### Like a tweet (requires auth)

```
Client → POST /api/tweets/:id/like (Authorization: Bearer <token>)
  → authMiddleware
  → validateParam('id') (checks id is positive integer)
  → likeController.like
    → tweetModel.findTweetById (check tweet exists)
    → likeModel.hasLiked (check not already liked)
    → likeModel.likeTweet (INSERT INTO tweet_likes)
    → tweetModel.updateLikesCount (increment on tweet)
  ← Response: { data: { message: "Tweet liked" } } (201)
```
