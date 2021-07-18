describe('Blog app', function() {
  beforeEach(function(){
    cy.visit('http://localhost:3000')
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'some person',
      username: 'guest',
      password: 'guest'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
  })

  it('fails with wrong credentials used', function() {
    cy.get('[data-cy=username]').type('wrong')
    cy.get('[data-cy=password]').type('credentials')
    cy.get('[data-cy=login-button]').click()
    cy.get('.error').contains('Wrong credentials')
  })

  it('succeeds with good credentials', function() {
    cy.get('[data-cy=username]').type('guest')
    cy.get('[data-cy=password]').type('guest')
    cy.get('[data-cy=login-button]').click()
    cy.contains('logged in')
  })

  describe('when logged in', function() {
    beforeEach(function () {
      cy.get('[data-cy=username]').type('guest')
      cy.get('[data-cy=password]').type('guest')
      cy.get('[data-cy=login-button]').click()
    })

    it('front page can be opened', function() {
      cy.contains('Log in to the application')
    })

    it('add a new blog', function() {
      cy.get('[data-cy=new-button]').click()
      cy.get('[data-cy=title-input]').type('testing')
      cy.get('[data-cy=author-input]').type('can be')
      cy.get('[data-cy=url-input]').type('enjoyable')

      cy.get('[data-cy=create-button]').click()

      cy.contains('testing can be')
    })

    describe('with initial blogs', function() {
      beforeEach(function() {
        cy.get('[data-cy=new-button]').click()
        cy.get('[data-cy=title-input]').type('testing')
        cy.get('[data-cy=author-input]').type('can be')
        cy.get('[data-cy=url-input]').type('enjoyable')
        cy.get('[data-cy=create-button]').click()

        // cy.get('[data-cy=new-button]').click()
        // cy.get('[data-cy=title-input]').type('its actually')
        // cy.get('[data-cy=author-input]').type('pretty cool')
        // cy.get('[data-cy=url-input]').type('fo real')
      })
      it('like button works', function() {
        cy.get('[data-cy=details-button]').click()
        cy.get('[data-cy=like-div]').contains('0')
        cy.get('[data-cy=like-button]').click()
        cy.get('[data-cy=like-div]').contains('1')

      })

      it('delete button works', function() {
        cy.get('[data-cy=details-button]').click()
        cy.get('[data-cy=delete-button]').click()
        cy.on('window:confirm', (str) => {
          // lint doesn't like .to, but I do
          expect(str).to.equal('Remove testing by can be?') // eslint-disable-line 
        })
        cy.get('[data-cy=details-button]').should('not.exist')
      })

      it.only('cant delete other users blogs', function() {
        const user2 = {
          name: 'different person',
          username: 'imposter',
          password: 'imposter'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user2)

        cy.get('[data-cy=logout-button]').click()

        cy.get('[data-cy=username]').type('imposter')
        cy.get('[data-cy=password]').type('imposter')
        cy.get('[data-cy=login-button]').click()

        cy.get('[data-cy=details-button]').click()
        cy.get('[data-cy=delete-button]').should('not.exist')
      })
    })
  })

})