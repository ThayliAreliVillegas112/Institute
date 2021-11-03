<?php

namespace App\Controller;

header('Access-Control-Allow-Origin:*');  //se agregó esta linea

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

// Json response
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class SchoolController extends AbstractController
{
    
    public function school()
    {

        $em = $this->getDoctrine()->getManager();

        $query = $em->createQuery('SELECT s.id, s.name, s.street, s.created, s.updated, s.status FROM App:School s');
        $listSchool = $query->getResult();
        $data = [
            'status' => 200,
            'message' => 'Hola! No se han encontrado resultados'
        ];
        if (count($listSchool) > 0) {
            $data = [
                'status' => 200,
                'message' => 'Hola! Se encontraron ' . count($listSchool) . 'Resultados',
                'listSchool' => $listSchool
            ];
        }
        return new JsonResponse($data);
    }

    public function school_by_id($id)
    {
        $em = $this->getDoctrine()->getManager();

        $query = $em->createQuery('SELECT s.id, s.name, s.street, s.created, s.updated, s.status FROM App:School s WHERE s.id = :s');
        $query->setParameter(':s', $id);
        $school = $query->getResult();
        $data = [
            'status' => 200,
            'message' => 'Hola! Se ha encontrado la escuela. ',
            'school' => $school
        ];
        return new JsonResponse($data);
    }

    public function create_school(Request $request){
        $em = $this->getDoctrine()->getManager();

        $name = $request->get('name', null);
        $street = $request->get('street', null);
        $created = $request->get('created', null);
        $dtTmp = new \DateTime('now');

        $school = new  \App\Entity\School();

        $school->setName($name);
        $school->setStreet($street);
        $school->setCreated($dtTmp);
        $school->setStatus(1);

        $em->persist($school); //sentencia de la insercción
        $em->flush(); // Es como un commit

        $data = [
            'status' => 200,
            'message' => 'Hola! Se ha creado correctamente. ',
            'school' => $school
        ];

        return new JsonResponse($data);
    }

    public function delete_school($id){
        $em = $this->getDoctrine()->getManager();

        $query = $em->createQuery('UPDATE App:School s SET s.status = 0 WHERE s.id = :id');
        $query->setParameter(':id', $id);
        $school = $query->getResult();

        $data = [
            'status' => 200,
            'message' => 'Hola! Se ha deshabilitado la escuela correctamente. ',
            'product' => $school
        ];
        return new JsonResponse($data);
    }

    public function update_school(Request $request, $id){
        $em = $this->getDoctrine()->getManager();

        $name = $request->get('name', null);
        $street = $request->get('street', null);
        $updated = $request->get('updated', null);
        $dtTmp = new \DateTime('now');

        $query = $em->createQuery(
            'UPDATE App:School s SET s.name = :name, s.street = :street, s.updated = :updated
            WHERE s.id = :id'
        );

        $query->setParameter('name', $name);
        $query->setParameter('street', $street);
        $query->setParameter('updated', $dtTmp);
        $query->setParameter('id', $id);
        $flag = $query->getResult();

        if($flag == 1){
            $data = [
                'status' => 200,
                'message' => 'Hola! Se ha actualizado correctamente. '
            ];
        }else{
            $data = [
                'status' => 200,
                'message' => 'Hola! No se ha actualizado correctamente. '
            ];
        }
        return new JsonResponse($data);
    }

}
