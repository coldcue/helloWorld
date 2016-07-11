package example;

import example.ExampleTest;

class ExampleSuite
{
    @Suite("Example")
    public var list : Array<Class<Dynamic>> = [ ExampleTest ];
}
