import json
import random

isLeading = random.choice([True, False])
isBatting = random.choice([True, False])
BowlerNames = ["Siraj", "Bumrah", "Bhuvi", "Chahar", "Rabada", "Archer", "Tye", "Tahir", "Rashid", "Nortje"]
BatterNames = ["Rahane", "Dhoni", "Kohli", "ABD", "Raina", "Rohit", "Warner", "Buttler", "Williamson", "Pant"]
score = {
    "teams": [
        {
            "name": "CSK",
            "isLeading": isLeading
        },
        {
            "name": "RCB",
            "isLeading": not isLeading
        }
    ],
    "matchInfo": {
        "target": random.randint(150, 250),
        "bowlingInfo": {
            "overCount": random.randint(10, 20),
            "ballCount": random.randint(0, 6),
            "bowlerInfo": {
                "name": random.choice(BowlerNames),
                "wickets": random.randint(0, 5),
                "allowedScore": random.randint(20, 60)
            },
            "currentOver": [random.randint(0, 6), random.randint(0, 6), random.randint(0, 6), random.randint(0, 6), random.randint(0, 6), random.randint(0, 6)]
        },
        "battingInfo": {
            "batters": [
                {
                    "name": random.choice(BatterNames),
                    "isBatting": isBatting,
                    "runs": random.randint(0, 100),
                    "bowlsFaced": random.randint(0, 50)
                },
                {
                    "name": random.choice(BatterNames),
                    "isBatting": not isBatting,
                    "runs": random.randint(0, 100),
                    "bowlsFaced": random.randint(0, 50)
                }
            ]
        }
    }
}

with open("score.json", "w") as file:
    json.dump(score, file)