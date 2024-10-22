export const pass = {
  '/member': {
    post: {
      tags: ['Member'],
      summary: 'Create a new pas for user ',
      description: 'Creates a new user in the system',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/CreatePassDto' },
          },
        },
      },
      responses: {
        '200': {
          description: 'Pass created successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  response: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                    },
                  },
                  person: { $ref: '#/components/schemas/PersonDto' },
                },
              },
            },
          },
        },
        '400': { description: 'Error' },
      },
    },
  },
  '/member/{memberId}': {
    delete: {
      tags: ['Member'],
      summary: 'Delete member',
      parameters: [
        {
          name: 'memberId',
          in: 'path',
          required: true,
          description: 'The ID of the member received while creating pass',
          schema: { type: 'string' },
        },
      ],
      responses: {
        '200': {
          description: 'Member deleted',
          content: {
            'application/json': {
              schema: {
                type: 'string',
              },
            },
          },
        },
        '400': { description: 'Error' },
      },
    },
    patch: {
      tags: ['Member'],
      summary: 'Update member',
      parameters: [
        {
          name: 'memberId',
          in: 'path',
          required: true,
          description: 'The ID of the member received while creating pass',
          schema: { type: 'string' },
        },
        {
          name: 'tierId',
          in: 'query',
          required: true,
          description: 'The ID of the tier',
          schema: { type: 'string' },
        },
        {
          name: 'programId',
          in: 'query',
          required: true,
          description: 'The ID of the program',
          schema: { type: 'string' },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/PersonDto' },
          },
        },
      },
    },
    get: {
      tags: ['Member'],
      summary: 'Get by member id',
      parameters: [
        {
          name: 'memberId',
          in: 'path',
          required: true,
          description: 'The ID of the member received while creating pass',
          schema: { type: 'string' },
        },
      ],
      responses: {
        '200': {
          description: 'Member record',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                  },
                  person: { $ref: '#/components/schemas/PersonDto' },
                },
              },
            },
          },
        },
        '400': { description: 'Error' },
      },
    },
  },
};
