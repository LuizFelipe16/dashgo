import { createServer, Factory, Model, Response, ActiveModelSerializer } from 'miragejs';
import faker from 'faker';

type User = {
  name: string;
  email: string;
  created_at: string;
};

export function makeServer() {
  const server = createServer({
    serializers: {
      // diz para o mjs como deve interpretar os dados enviados por ele
      application: ActiveModelSerializer,
      // isso é para por exemplo, cadastrar em dois models d euma vez com uam chaamda só, e não duas
    },

    models: {
      user: Model.extend<Partial<User>>({})
    },

    factories: {
      user: Factory.extend({
        name(i: number) {
          return `user ${i + 1}`
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        createdAt() {
          return faker.date.recent(10);
        },
      }),
    }, // formas de conseguir gerar dados em quantidade

    seeds(server) {
      server.createList('user', 20); // criar x dados; 
    },

    routes() {
      this.namespace = 'api';
      this.timing = 750;

      this.get('/users', function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;

        const total = schema.all('user').length;

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all('user'))
          .users
          .slice(pageStart, pageEnd);

        return new Response(
          200,
          { 'x-total-count': String(total) },
          { users }
        );
      });

      this.get('/users/:id');

      this.post('/users'); // short hands: formas encontradas de escrever rotas prontas no mjs

      this.namespace = '';
      this.passthrough(); // toda chamada a api passa pelo mirage, caso não tenha, vai pra api do next
    }
  });

  return server;
}