# Auth best practise for avoid potential security risk

## Resources

- https://nextjs.org/docs/app/building-your-application/authentication#further-reading

## Prevent timing attack

[Source](https://www.reddit.com/r/nextjs/comments/19e8qjk/comment/kjd792k/?utm_source=share&utm_medium=web2x&context=3)

A very common (WRONG) way to authenticate is:

1. Lookup the user
2. If found, compare the entered password with the hashed password
3. Return on success.

The problem is step 2. Any hashing algorithm worth it's weight is slow because slow is a feature.

That means with the above logic, attempting to login as realuser@example.com and a known-bad password might take 1s, where attempting to login as fakeuser@example.com might take 100ms.

That means if there are no IP lockouts (or you circumvent them with VPNs), you can quickly check thousands of usernames to see which are valid in the system (EDIT: based on response time, in case I wasn't clear). After that point, with a list of confirmed usernames, you can match the username with known leaked passwords and eventually get dozens if not hundreds of matches. Captcha can help with this, but if the attacker already has a list or perspective usernames, he might just test semi-manually.

The right way to do it is to always hash the entered password, whether your user query finds an account or not. But that's not obvious. And depending on the database or query, it can hypothetically remain problematic if you ask SQL to hash the password and verify.

It's called a [timing attack vulnerability](https://ropesec.com/articles/timing-attacks/). The moral of this story is that there are DOZENS if not HUNDREDS of potential vulnerabilities just like this that are difficult if not impossibe to predict unless you write auth as your job. I prefer a centralized and publicly analyzed (ideally Open Source) library to minimize the risk of these more obscure or more sophisticated attacks.

And AuthJS would be that if it had a mature password adapter, even if they make you fill a config file saying "I know you don't like password auth but please let me use it anyway"