import {Single} from "@Annotate";

describe("Single annotation behaviour.", () => {

  @Single
  class Test {

    public testPropPublic: string = "initial";
    private testPropPrivate: number = 0;

    public getPrivateProp(): number {
      return this.testPropPrivate;
    }

    public setPrivateProp(newValue: number): void {
      this.testPropPrivate = newValue;
    }

  }

  it("Should reference single class object.", () => {

    const first: Test = new Test();
    const second: Test = new Test();

    expect(first.getPrivateProp()).toBe(second.getPrivateProp());
    first.setPrivateProp(Math.random());
    expect(second.getPrivateProp()).toBe(first.getPrivateProp());

    second.testPropPublic = "newValue";
    expect(second.testPropPublic).toBe(first.testPropPublic);

    expect(first).toBe(second);
  });

  it("Should correctly display own type.", () => {

    const temp: Test = new Test();

    expect(Object.getPrototypeOf(temp).constructor.name).toBe("Test");
    expect(Test.constructor.name).toBe("Function");
  });

});
