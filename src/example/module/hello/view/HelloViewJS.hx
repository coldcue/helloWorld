package example.module.hello.view;

import js.Browser;
import js.html.Element;

/**
 * ...
 * @author ali_o_kan - Laurent Deketelaere
 */
class HelloViewJS implements IHelloView
{

	var _content:Element;

	public function new()
	{
		this._content = Browser.document.getElementById("content");
	}

	public function showMessage( message : String ) : Void
	{
		this._content.innerText = message;
	}

	@:isVar public var visible(get, set):Bool;

	function get_visible():Bool
	{
		return visible;
	}

	function set_visible(value:Bool):Bool
	{
		return visible = value;
	}

}
