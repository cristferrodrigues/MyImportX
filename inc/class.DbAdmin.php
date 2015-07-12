<?php

class DbAdmin{

	//tipo: ira receber o tipo de linguagem que iremos utilizar no DB.
	private $tipo;
	//conn: irá receber o endereço da conexao ativa.
	private $conn;
	
	public function DbAdmin($tipo){
		$this->tipo = $tipo;
	}
	
	public function connect($host,$user,$sen,$base){
		
		switch($this->tipo){			
			
			case 'mysql':
			$this->conn = mysql_connect($host,$user,$sen) 
						or die("Erro ao conectar ao sql".
								'-'.$host.'-'.$user.'-'.$sen);
						
			mysql_select_db($base) 
				or die("Não foi possivel conectar na base informada");			
				
			break;
			
			case 'pgsql':
			
				//codigo da classe refente a conexao com o banco em pgsql
			
			break;
			
			case 'mssql':
				
				//codigo da classe refente a conexao com o banco em mssql
				
			break;
			
			case 'firebird':
			
				//codigo da classe refente a conexao com o banco em firebird
				$this->conn = ibase_connect($host,$user,$sen) or die("Erro ao conectar ao sql");
				
				
			break;
		
		}
		
	}
	public function query($sql){
		
		switch($this->tipo){			
			
			case 'mysql':
			
				$res = mysql_query($sql,$this->conn) 
								  or die(mysql_error());		
								  
				
			break;
			
			case 'pgsql':
			
				//codigo da classe refente a conexao com o banco em pgsql
			
			break;
			
			case 'mssql':
				
				//codigo da classe refente a conexao com o banco em mssql
				
			break;
			
			case 'firebird':
			
				//codigo da classe refente a conexao com o banco em firebird
				$res = ibase_query($this->conn,$sql) or die(ibase_errmsg());
				
			break;
		
		}	
		return $res;
	}
	public function rows($res){
	
		switch($this->tipo){			
			
			case 'mysql':
			
				$num = mysql_num_rows($res);
				
			break;
			
			case 'pgsql':
			
				//codigo da classe refente a conexao com o banco em pgsql
			
			break;
			
			case 'mssql':
				
				//codigo da classe refente a conexao com o banco em mssql
				
			break;
			
			case 'firebird':
			
				//codigo da classe refente a conexao com o banco em firebird
				$num = ibase_num_fields($res);
			break;
		
		}	
		return $num;
	}
	public function result($res, $lin,$col){
		
		switch($this->tipo){			
			
			case 'mysql':
			
			$val = mysql_result($res, $lin,$col);
				
			break;
			
			case 'pgsql':
			
				//codigo da classe refente a conexao com o banco em pgsql
			
			break;
			
			case 'mssql':
				
				//codigo da classe refente a conexao com o banco em mssql
				
			break;
			
			case 'firebird':
			
				//codigo da classe refente a conexao com o banco em firebird
				$val = ibase_field_info($res, $lin);
			break;
		
		}	
		return $val;	
	}
}	
?>