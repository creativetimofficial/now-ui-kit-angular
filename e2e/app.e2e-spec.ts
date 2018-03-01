import { Pk2ProAngularPage } from './app.po';

describe('pk2-pro-angular App', () => {
  let page: Pk2ProAngularPage;

  beforeEach(() => {
    page = new Pk2ProAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
