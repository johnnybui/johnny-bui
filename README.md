## Code Challenge For Backend

### Preparation

```npm install```

### Problem 4

- Run the app to see result

  ```npm run prob4 <n>```
  
#### Comments on the functions:
- Closed-form Formula: This implementation is simple and fastest to run since it computes the sum directly. Runtime: Constant.
- Iterative Approach: This implementation is the easiest to understand since it iterates from 1 to n once. However it is significant slower than the previous because of the loop of sums. Runtime: Linear.
- Recursive Approach: This implementation use recursion to calculate the sum. It is simple but consume more memory due to recursive calls and there's a risk of stack overflow for large values of n. Runtime: Linear.

The most efficient approach is the Closed-form Formula.

### Problem 5

Stack I use for this backend include: ExpressJS (TypeScript), Prisma, Swagger, SQLite.

Please run in steps:

- Migrate the local database

  ```npm run prisma:migrate```

- Seed data

  ```npm run prisma:seed```

- Run the backend app

  ```npm run prob5```

- Open http://localhost:3000/api-docs to use and test the server API directly.