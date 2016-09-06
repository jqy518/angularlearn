<?php
/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-04-17 18:35:29
 * @version $Id$
 */

class Shop  {
	public $id;
    public $name;
   	public $price;
    public $author;
    function __construct($id,$name,$price,$author){
        $this->id = $id;
        $this->name = $name;
        $this->price = $price;
        $this->author = $author;
    }
    function getShop(){
    	return array(
    		"id"=>$this->id,
    		"name"=>$this->name,
    		"price"=>$this->price,
    		"author"=>$this->author
    	);
    }
}
$slist = array();
for ($i=1; $i <10; $i++) {
	$tshop = new Shop("AK000".$i,"javaScript从入门到转行".$i,"$12.9","小张");
	$slist[] = get_object_vars($tshop);
}
//var_dump($slist);
echo json_encode($slist);