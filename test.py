name = input("Enter your name: ")

if name == "alex":
    print("Hi" + name)
else:
    while name != "alex" :
        print("Please think your name again!")
        name = input("Please enter again your name: ")
    print("Hi" + name)