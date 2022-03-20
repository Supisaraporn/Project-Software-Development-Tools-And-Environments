import random as random_number

def main(x):
    n = True;
    i = 0
    while n == True:
        num = int(input())
        func(num)
        i += 1
        if x == False:
    		break:
def func(num):
    print("Player : "+str(num))
    n = False;
    count = 0
    ran_num = random_number.randint(1,10)
    if num == ran_num:
        count += 1
        print("That's right! Number of tries : " + str(count))
        main(n)
    elif num < ran_num:
        count += 1
        print("Try a greater number.")
    elif num > ran_num: 
        count += 1
        print("Try a smaller number.")



main()
func()