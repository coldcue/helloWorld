package example.module.hello;

import example.module.hello.controller.SetMessageCommand;
import example.module.hello.message.HelloModuleMessage;
import example.module.hello.model.IMessageModel;
import example.module.hello.model.MessageModel;
import example.module.hello.view.HelloViewHelper;
import example.module.hello.view.IHelloView;
import hex.config.stateless.StatelessCommandConfig;
import hex.config.stateless.StatelessModelConfig;
import hex.control.request.StringRequest;
import hex.module.dependency.IRuntimeDependencies;
import hex.module.dependency.RuntimeDependencies;
import hex.module.Module;

/**
 * ...
 * @author ali_o_kan - Laurent Deketelaere
 */
class HelloModule extends Module implements IHelloModule
{

	public function new()
	{
		super();

		this._addStatelessConfigClasses([CommandConfig, ModelConfig]);
		this.buildView();
	}

	function buildView() : Void
	{
		#if flash
			var container : flash.display.Sprite = new flash.display.Sprite();
			flash.Lib.current.addChild( container );
			this.buildViewHelper( HelloViewHelper, new example.module.hello.view.HelloViewFlash( container ) );
		#elseif js
			this.buildViewHelper( HelloViewHelper, new example.module.hello.view.HelloViewJS() );
		#else
			#error  // will display an error "Not implemented on this platform"
		#end
	}

	public function setMessage( message : String ) : Void
	{
		this._dispatchPrivateMessage( HelloModuleMessage.SET_MESSAGE, [new StringRequest(message)] );
	}

	// Don't ask why, it is mandatory!
	override function _getRuntimeDependencies() : IRuntimeDependencies
	{
		var rd = new RuntimeDependencies();
		return rd;
	}
}

private class CommandConfig extends StatelessCommandConfig
{
	override public function configure():Void
	{
		this.map( HelloModuleMessage.SET_MESSAGE, SetMessageCommand );
	}
}

private class ModelConfig extends StatelessModelConfig
{
	override public function configure() : Void
	{
		this.mapModel( IMessageModel, MessageModel);
	}
}
