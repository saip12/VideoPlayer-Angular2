import { MysecondappPage } from './app.po';

describe('mysecondapp App', () => {
  let page: MysecondappPage;

  beforeEach(() => {
    page = new MysecondappPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
