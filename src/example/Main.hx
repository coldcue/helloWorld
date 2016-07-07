package example;

import hex.compiler.parser.xml.XmlCompiler;
import hex.log.layout.LogProxyLayout;

/**
 * ...
 * @author ali_o_kan - Laurent Deketelaere
 */
class Main
{	
	static function _initLogger() : Void
	{
		var proxy : LogProxyLayout = new LogProxyLayout();
		#if js
		var controller = new hex.log.layout.LogLayoutHTMLView( proxy );
		proxy.addListener( new hex.log.layout.SimpleBrowserLayout( controller.consoleWrapperTaget ) );
		proxy.addListener( new hex.log.layout.JavaScriptConsoleLayout() );
		#elseif flash
		proxy.addListener( new hex.log.layout.TraceLayout() );
		#end
	}

	public function new() 
	{
		XmlCompiler.readXmlFile( "example/configuration/context.xml" );
	}

	public static function main() : Void
	{
		_initLogger();
		new Main();
	}
}