import { createPass } from '@services';
import { BaseController, Controller, Get } from '@utils';

@Controller('/pass')
export class PassController extends BaseController {
  @Get('/', [])
  async getPass(_: Express.Request) {
    await createPass();
    return 'ok';
  }
}
