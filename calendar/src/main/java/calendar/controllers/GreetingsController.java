package calendar.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import calendar.model.Tarefa;
import calendar.repository.TarefaRepository;

/**
 *
 * A sample greetings controller to return greeting text
 */
@RestController
public class GreetingsController {

    @Autowired
    private TarefaRepository tarefaRepository;
    // /**
    //  *
    //  * @param name the name to greet
    //  * @return greeting text
    //  */
    // @RequestMapping(value = "/{name}", method = RequestMethod.GET)
    // @ResponseStatus(HttpStatus.OK)
    // public String greetingText(@PathVariable String name) {
    //     Tarefa tarefa = new Tarefa();
    //     tarefa.setTitulo(name);
    //     tarefaRepository.save(tarefa);
    //     return "Hello " + name + "!";
    // }

    @GetMapping(value = "listaTodos")
    @ResponseBody /* Retorno do Json */
     public ResponseEntity<List<Tarefa>> listaTarefa(){
        List<Tarefa> tarefas = tarefaRepository.findAll();
        System.out.print(tarefas.get(0).getTitulo());
        return new ResponseEntity<List<Tarefa>>(tarefas, HttpStatus.OK);
     }
     @PostMapping(value = "salvarTarefa")
     @ResponseBody
     public ResponseEntity<Tarefa> salvarTarefa(@RequestBody Tarefa tarefa){
        Tarefa newTarefa = tarefaRepository.save(tarefa);

        return new ResponseEntity<Tarefa>(newTarefa, HttpStatus.CREATED);
     }

     @DeleteMapping(value = "deletarTarefa")
     @ResponseBody
     public ResponseEntity<String>deletarTarefa(@RequestParam Long idTarefa){
         tarefaRepository.deleteById(idTarefa);

         return new ResponseEntity<String>("Tarefa Removida!",HttpStatus.OK);
     }
     @GetMapping(value="buscarTarefa")
     @ResponseBody
     public ResponseEntity<Tarefa> buscarTarefa(@RequestParam Long idTarefa){
     //public ResponseEntity<Tarefa> buscarTarefa(@RequestParam(name="idTarefa") Long idTarefa){ 
        Tarefa newTarefa= tarefaRepository.findById(idTarefa).get();

        return new ResponseEntity<Tarefa>(newTarefa, HttpStatus.OK);

     }
     @PutMapping(value = "atualizarTarefa")
     @ResponseBody
     public ResponseEntity<?> atualizarTarefa(@RequestBody Tarefa tarefa){
        if(tarefa.getId()== null){
            return new ResponseEntity<String>("Id não informado",HttpStatus.NOT_FOUND);
        }
        else if(!tarefaRepository.findById(tarefa.getId()).isPresent()){
            return new ResponseEntity<String>("Tarefa não encontrada",HttpStatus.NOT_FOUND);
        }
        else{
        Tarefa newTarefa = tarefaRepository.saveAndFlush(tarefa);
        return new ResponseEntity<Tarefa>(newTarefa,HttpStatus.OK);
        }
     }

     @GetMapping(value = "buscarPorTitulo")
     @ResponseBody
     public ResponseEntity<List<Tarefa>> buscarPorTitulo(@RequestParam String titulo){
     //public ResponseEntity<List<Tarefa>> buscarPorTitulo(@RequestParam(title="titulo") String titulo){   
        List<Tarefa> tarefas = tarefaRepository.buscarPorTitulo(titulo);

        return new ResponseEntity<List<Tarefa>>(tarefas, HttpStatus.OK);
     }
}
