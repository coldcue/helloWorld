package example.module.hello.view;

import flash.display.Loader;
import flash.display.Sprite;
import flash.net.URLRequest;
import hex.view.BasicView;


class HelloViewFlash extends BasicView implements IHelloView
{
	var _layout : Sprite;

	public function new( layout : Sprite )
	{
		super();
		this._layout = layout;
	}

	public function showMessage( message : String ) : Void
	{
		trace( message );
	}

}
