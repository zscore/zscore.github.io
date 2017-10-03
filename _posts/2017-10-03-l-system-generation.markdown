---
layout: post
title:  "L Systems for Language Generation"
date:   2017-10-03 17:00:00 +0100
categories: data
---

## L Systems
So this is quite an old project, but I figured I should give it a bit of a
writeup. I was inspired by this project <http://www.itp.danmelancon.com/rwet/l-system-poem-system-poem-l-poem-l-system/>  to make my own L-system generator.
What I did was take a corpus (something from NLTK for python) that was tagged
with part of speech then extract all 3-grams, like
``ADJ, ADJ, N``, and then keep all 3 grams above a frequency threshold.
These became the production rules for my grammar. At each step in the L-system,
I randomly selected a production rule for each POS in order to expand it.
Then, I randomly selected words from within each Part of Speech to populate
the new sentence. I have an L-System that's supposed to simulate the
internal world of a weasel [here](/l_systems/weasel.html), and a
[general one](/l_systems/l-system.html)
that let's you pick the words you want to substitute within classes. My friend
put in things like \*record scratch\* for full stop, which is rather amusing.
