import json
import random

score = {
    "score": random.randint(100, 200),
    "over": random.randint(10, 20)
}

with open("score.json", "w") as file:
    json.dump(score, file)