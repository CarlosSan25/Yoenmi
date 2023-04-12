<?php

class Post{
    private $id;
    private $user_id;
    private $content;
    private $image;
    private $date;

    public function __construct($id, $u_id, $c, $img, $d)
    {
        $this->id = $id;
        $this->user_id = $u_id;
        $this->content = $c;
        $this->image = $img;
        $this->date = $d;
    }
}

?>