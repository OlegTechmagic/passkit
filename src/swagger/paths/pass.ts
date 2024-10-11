export const pass = {
  '/pass': {
    post: {
      summary: 'Create a new pas for user ',
      description: 'Creates a new user in the system',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreatePassDto' },
            example: {
              tierId: 'base',
              programId: '2Wre85EdpwAbQjIzEZ7WVt',
              person: {
                name: 'test',
                surname: 'test',
                email: 'keeperoleg26@gmail.com',
                address1: 'test address',
                phone: '+380979797979',
                externalId: 'externaltestid',
                gender: 1,
              },
            },
          },
        },
      },
      responses: {
        '201': { description: 'Pass created successfully' },
        '400': { description: 'Validation error' },
      },
    },
  },
};
