// Declaration
export default class Cell {
  constructor(info, headers) {
    const self = this;
    headers.forEach((header,i)=> {
      let value= info[i];

      if(value ===undefined)
      {
          console.log(info);

      }
      
      value = value.trim().replace(/^"(.+(?="$))"$/, '$1');

      if(value=="-"||value=="")
      {
         value= null;
    
      }
    
      self[header]= value;
    
    }) 
  }

 // oem,model,launch_announced,launch_status,body_dimensions,body_weight,body_sim,display_type,display_size,display_resolution,features_sensors,platform_os


  get oem()
  {

    return this._oem; 
  }

  set oem(value)
  {
    this._oem = value;
  }


  get model()
  {

    return this._model;
    
  }

  set model(value)
  {
    this._model = value;
  }

  get launch_announced()
  {

    return this._launch_announced;
    
  }

  set launch_announced(value)
  {
    this._launch_announced = value;
  }


  get launch_status()
  {

    return this._launch_status;
    
  }

  set launch_status(value)
  {
    this._launch_status = value;
  }


  get body_dimensions()
  {

    return this._body_dimensions;
    
  }

  set body_dimensions(value)
  {
    this._body_dimensions = value;
  }



  get body_weight()
  {

    return this._body_weight;
    
  }

  set body_weight(value)
  {
    this._body_weight = value;
  }



  get body_sim()
  {

    return this._body_sim;
    
  }

  set body_sim(value)
  {
    this._body_sim = value;
  }


  
  get display_type()
  {

    return this._display_type;
    
  }

  set display_type(value)
  {
    this._display_type = value;
  }


  


  get display_size()
  {

    return this._display_size;
    
  }

  set display_size(value)
  {
    this._display_size = value;
  }





  get display_resolution()
  {

    return this._display_resolution;
    
  }

  set display_resolution(value)
  {
    this._display_resolution = value;
  }


  
  get features_sensors()
  {

    return this._features_sensors;
    
  }

  set features_sensors(value)
  {
    this._features_sensors = value;
  }



  get platform_os()
  {

    return this._platform_os;
    
  }

  set platform_os(value)
  {
    this._platform_os = value;
  }




  
  


}