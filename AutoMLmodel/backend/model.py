from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.cluster import KMeans

def get_model(task, algorithm):
    if task == "classification":
        if algorithm == "rf":
            return RandomForestClassifier()
        elif algorithm == "dt":
            return DecisionTreeClassifier()
        elif algorithm == "knn":
            return KNeighborsClassifier()

    elif task == "regression":
        return RandomForestRegressor()

    elif task == "clustering":
        return KMeans(n_clusters=3)


def get_all_models():
    return {
        "RandomForest": RandomForestClassifier(),
        "DecisionTree": DecisionTreeClassifier(),
        "KNN": KNeighborsClassifier()
    }