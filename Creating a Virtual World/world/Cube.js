class Cube{

    constructor(){
        this.type = 'cube';
        // this.position = [0.0,0.0,0.0];
        this.color = [1.0,1.0,1.0,1.0];
        // this.size = 5.0;
        // this.segments = 10;
        this.matrix = new Matrix4();
        this.textureNum = -2;
/*
        this.vertices = { front: [], back: [], top: [], bot: [], right: [], left: [] };
        this.uv = { front: [], back: [], top: [], bot: [], right: [], left: [] };
        this.buffer = gl.createBuffer();
        this.flag = false;
        */
    }
    
    

    render(){
        var rgba = this.color;
/*
        if(!this.generated){
            this.generateVertices();
        }
*/
        // pass the texture number
        gl.uniform1i(u_whichTexture,this.textureNum);
  
        // // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0]*1.1, rgba[1]*1.1, rgba[2]*1.1, rgba[3]);

        gl.uniformMatrix4fv(u_ModelMatrix,false,this.matrix.elements);

        // front
        //drawTriangle3DUV(this.vertices.front,this.uv.front, this.buffer);
        
        drawTriangle3DUV( [0,0,0, 1,1,0, 1,0,0], [1,0, 0,1, 1,1]);
        drawTriangle3DUV( [0,0,0, 0,1,0, 1,1,0], [1,0, 1,1, 0,1] );
        
        
        // // // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0]*1.1, rgba[1]*1.1, rgba[2]*1.1, rgba[3]);

        // //back
        //drawTriangle3DUV(this.vertices.back,this.uv.back, this.buffer);
        
        drawTriangle3DUV( [0,0,1, 1,1,1, 1,0,1], [1,0, 0,1, 1,1] );
        drawTriangle3DUV( [0,0,1, 0,1,1, 1,1,1] , [1,0, 0,1, 1,1]);
        

        // pass the color of a point to u_FragColor uniform variable
        gl.uniform4f(u_FragColor, rgba[0]*.9, rgba[1]*.9, rgba[2]*.9, rgba[3]*0.9);

        // top of the cube
        //drawTriangle3DUV(this.vertices.top,this.uv.top, this.buffer);
        
        drawTriangle3DUV( [0,1,0, 0,1,1, 1,1,1], [0,0, 0,1, 1,1] );
        drawTriangle3DUV( [0,1,0, 1,1,1, 1,1,0], [0,0,1,1,1,0] );
        

        // pass the color of a point to u_FragColor uniform variable
        gl.uniform4f(u_FragColor, rgba[0]*.9, rgba[1]*.9, rgba[2]*.9, rgba[3]);

        // bottom
        //drawTriangle3DUV(this.vertices.bot,this.uv.bot, this.buffer);
        
        drawTriangle3DUV( [0,0,0, 0,0,1, 1,0,1], [0,0,0,1,1,1] );
        drawTriangle3DUV( [0,0,0, 1,0,1, 1,0,0], [0,0,1,1,1,0] );
        

        // pass the color of a point to u_FragColor uniform variable
        gl.uniform4f(u_FragColor, rgba[0]*0.9, rgba[1]*0.9, rgba[2]*0.9, rgba[3]);

        // left
        //drawTriangle3DUV(this.vertices.left,this.uv.left, this.buffer);
        
        drawTriangle3DUV( [0,1,0, 0,0,1, 0,1,1], [0,0,0,1,1,0] );
        drawTriangle3DUV( [0,0,0, 0,1,0, 0,0,1], [1,1,0,1,1,0] );
        

        // pass the color of a point to u_FragColor uniform variable
        gl.uniform4f(u_FragColor, rgba[0]*0.9, rgba[1]*0.9, rgba[2]*0.9, rgba[3]);

        // right
        //drawTriangle3DUV(this.vertices.right,this.uv.right, this.buffer);
        
        drawTriangle3DUV( [1,0,1, 1,1,0, 1,0,0], [1,0,0,1,1,1] );
        drawTriangle3DUV( [1,1,1, 1,1,0, 1,0,1] , [1,0,0,1,0,0]);
        

        
    }

}

  