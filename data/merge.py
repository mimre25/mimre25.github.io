import pandas as pd

# athletes = pd.read_csv('athletes.csv', delimiter=',')
# id_names = pd.read_csv('id_names.csv', delimiter=',')
# population = pd.read_csv('population.csv', delimiter=',')
# # data = [None] * len(pop)

# data = pd.read_csv('data.csv', delimiter=',')

# data = athletes.merge(id_names, on='name', how='left')


a = pd.read_csv('pop_athletes_names.csv', delimiter=',')
b = pd.read_csv('medals.csv', delimiter=',')

# print data
# out = data.merge(population, on='name', how='left');
out = a.merge(b, on='name', how='left');

out.to_csv("data.csv", index=False)
# for i in range(0, len(pop)):
# 	data[i] = pop[i]
# 	for j in range(0, len(athletes)):
# 		if pop[i][1] == athletes[j][1]:
# 			data[i]["athletes"] = athletes[j]

# print data[0]