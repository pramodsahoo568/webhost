from user import User


def authenticate(username, password):
    print("authenticate" + username + ":" + password)
    user = User.find_user_by_name(username)

    if user and user.password == password:
        print("Return User")
        return user
    else:
        print("Return None")
        return None


def identity(payload):
    print("identity...")
    user_id = payload['identity']

    return User.find_user_by_id(user_id)
