import { Page } from "@playwright/test";

export class PulpitPage {
  constructor(private page: Page) {}
pulpitHeaderTitle = this.page.getByText("Products");
};